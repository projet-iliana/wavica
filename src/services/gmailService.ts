export interface SendEmailPayload {
  to: string;
  subject: string;
  bodyHtml: string;
}

/**
 * Encodes an RFC 2822 email message for Gmail API send
 */
function createRawEmail(to: string, from: string, subject: string, htmlContent: string): string {
  // UTF-8 safe base64 encoding
  const encodeBase64Utf8 = (str: string) => {
    return btoa(unescape(encodeURIComponent(str)));
  };

  const utf8Subject = `=?utf-8?B?${encodeBase64Utf8(subject)}?=`;

  const emailLines = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${utf8Subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    encodeBase64Utf8(htmlContent),
  ];

  const rawMime = emailLines.join("\r\n");
  // Gmail expects base64url format
  return btoa(rawMime)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Sends an email using the Gmail REST API with the Bearer access token
 */
export async function sendGmailMessage(
  accessToken: string,
  fromEmail: string,
  payload: SendEmailPayload
): Promise<{ id: string; threadId: string }> {
  const raw = createRawEmail(payload.to, fromEmail, payload.subject, payload.bodyHtml);

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Erreur Gmail (${response.status})`;
    throw new Error(message);
  }

  return await response.json();
}
