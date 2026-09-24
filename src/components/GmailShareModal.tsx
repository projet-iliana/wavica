import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { initAuth, googleSignIn, logout, getAccessToken } from "../services/authService";
import { sendGmailMessage } from "../services/gmailService";
import {
  Mail,
  X,
  Send,
  CheckCircle,
  AlertCircle,
  LogOut,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";

interface GmailShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPptx?: () => void;
}

export function GmailShareModal({ isOpen, onClose, onDownloadPptx }: GmailShareModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [recipient, setRecipient] = useState("vidioteca5@gmail.com");
  const [subject, setSubject] = useState(
    "[Dossier Confidentiel] WAVICA 2.0 — Pitch Deck & Business Plan Exécutif (Passeport Talent)"
  );
  const [status, setStatus] = useState<"idle" | "confirming" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sentMessageId, setSentMessageId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err?.message || "Impossible de se connecter avec Google. Veuillez réessayer."
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setStatus("idle");
  };

  const buildHtmlBody = () => {
    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; max-width: 650px; line-height: 1.6;">
        <div style="background: #0b132b; padding: 24px; border-radius: 12px; color: #ffffff; text-align: center;">
          <h1 style="margin: 0; font-size: 26px; letter-spacing: 2px; color: #ffffff;">WAVICA 2.0</h1>
          <p style="margin: 6px 0 0 0; color: #06b6d4; font-size: 13px; font-weight: bold; letter-spacing: 3px;">YOUR HEALTH · YOUR FUTURE</p>
          <p style="margin: 12px 0 0 0; font-size: 14px; color: #cbd5e1;">Active Intervention Layer pour Wearables & Récupération Neuro-Acoustique</p>
        </div>

        <div style="padding: 24px 8px;">
          <p>Bonjour,</p>
          <p>Veuillez trouver ci-dessous les éléments de synthèse du <strong>Business Plan et du Pitch Deck WAVICA 2.0</strong>, préparés pour le tour d'amorçage Seed (600 000 €) et le dossier officiel du titre de séjour <em>Passeport Talent — Création d'entreprise / Porteur de projet innovant</em> en France.</p>

          <div style="background: #f8fafc; border-left: 4px solid #06b6d4; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <h3 style="margin: 0 0 8px 0; color: #0f172a; font-size: 15px;">Faits Marquants & KPIs Clés :</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #334155;">
              <li><strong>Innovation de Rupture :</strong> Couche d'intervention active (N-of-1) au-dessus d'Apple Watch et Oura pour transformer les données biométriques passives en actions concrètes de régénération nerveuse.</li>
              <li><strong>Actifs Déjà Réalisés :</strong> MVP fonctionnel v1.0, 40h de catalogue sonore propriétaire, pilote Monaco auprès de membres VIP, conformité RGPD/CNIL.</li>
              <li><strong>Marché Quinquennal :</strong> Chiffre d'affaires prévisionnel de <strong>8,4 k€</strong> (2026 pilote) à <strong>9,38 M€</strong> (2030), avec une marge brute cible de <strong>89,5%</strong>.</li>
              <li><strong>Seuil de Rentabilité (Break-Even) :</strong> Atteint au T2 2028 (Mois 18 post-seed) avec un EBITDA de <strong>+473 k€</strong>.</li>
              <li><strong>Unit Economics Remarquables :</strong> CAC de 18 €, LTV de 380 €, ratio LTV/CAC de <strong>21,1x</strong> et payback en 1,8 mois.</li>
              <li><strong>Impact Économique en France :</strong> Création de <strong>27 emplois qualifiés</strong> en France d'ici 2030 (IA, Acoustique, Mobile à Sophia Antipolis / Nice).</li>
            </ul>
          </div>

          <p>La présentation complète au format PowerPoint (.pptx) ainsi que le dossier financier A4 imprimable peuvent être téléchargés directement depuis l'application.</p>

          <p style="margin-top: 24px;">Restant à votre entière disposition pour tout échange approfondi ou démonstration du MVP.</p>

          <p style="margin-top: 24px; color: #64748b; font-size: 13px;">
            Bien cordialement,<br>
            <strong>La Direction · SASU WAVICA France</strong><br>
            Nice Métropole / Sophia Antipolis (Alpes-Maritimes), France
          </p>
        </div>
      </div>
    `;
  };

  const handleSendEmail = async () => {
    if (!user) return;
    setStatus("sending");
    setErrorMessage(null);

    try {
      const activeToken = token || (await getAccessToken());
      if (!activeToken) {
        throw new Error("Jeton d'accès Google expiré. Veuillez vous reconnecter.");
      }

      const res = await sendGmailMessage(activeToken, user.email || "", {
        to: recipient,
        subject: subject,
        bodyHtml: buildHtmlBody(),
      });

      setSentMessageId(res.id);
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        err?.message || "Erreur lors de l'envoi de l'e-mail via l'API Gmail. Vérifiez les autorisations."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-red-950/70 border border-red-500/30 rounded-2xl text-red-400">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Partager la Présentation via Gmail
            </h3>
            <p className="text-xs text-slate-400">
              Envoyez le pitch deck et la synthèse financière aux investisseurs ou pour votre dossier officiel
            </p>
          </div>
        </div>

        {/* Not Logged In State */}
        {!user ? (
          <div className="space-y-6 text-center py-4">
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl text-xs text-slate-300 leading-relaxed text-left space-y-2">
              <span className="font-semibold text-teal-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Intégration Sécurisée Google Workspace
              </span>
              <p>
                Connectez votre compte Google pour envoyer directement cet e-mail de synthèse institutionnelle avec votre adresse Gmail.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2 text-left">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Official Google Sign-in Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="flex items-center gap-3 px-5 py-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                <span>{isSigningIn ? "Connexion en cours..." : "Continuer avec Google"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* User Logged In State */
          <div className="space-y-4">
            {/* User Session Bar */}
            <div className="flex items-center justify-between p-3 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs">
              <div className="flex items-center gap-2.5">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-7 h-7 rounded-full" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <span className="font-bold text-white block truncate max-w-[200px]">
                    {user.displayName || user.email}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate max-w-[200px]">
                    {user.email}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors text-[11px]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Déconnexion</span>
              </button>
            </div>

            {/* Email Form Fields */}
            {status !== "success" ? (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Destinataire
                  </label>
                  <input
                    type="email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="investisseur@fonds.fr ou préfecture"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Objet de l'e-mail
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Aperçu du contenu inclus
                  </label>
                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-[11px] text-slate-300 space-y-1.5 max-h-36 overflow-y-auto font-mono">
                    <p className="text-teal-400 font-bold">• Synthèse Exécutive WAVICA 2.0 (Active Intervention Layer)</p>
                    <p>• Faits marquants : MVP v1.0, Catalogue 40h, Pilote Monaco</p>
                    <p>• P&L 2026-2030 : CA 8,4 k€ → 9,38 M€, Marge 89,5%</p>
                    <p>• Seuil de rentabilité : T2 2028 (Mois 18, EBITDA +473 k€)</p>
                    <p>• Impact France : 27 salariés qualifiés d'ici 2030 (Sophia Antipolis)</p>
                    <p>• Liens vers la présentation PPTX et le dossier Passeport Talent</p>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-950/50 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Explicit Mandatory User Confirmation Dialog before sending */}
                {status === "confirming" ? (
                  <div className="p-4 bg-teal-950/40 border border-teal-500/40 rounded-2xl space-y-3 animate-fadeIn">
                    <div className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-200">
                        <span className="font-bold text-white block">
                          Confirmer l'envoi de l'e-mail ?
                        </span>
                        Cet e-mail institutionnel sera envoyé depuis votre boîte Gmail (<strong>{user.email}</strong>) à destination de <strong>{recipient}</strong>.
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 rounded-lg transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        onClick={handleSendEmail}
                        className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-teal-500/20"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirmer et envoyer</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center justify-between gap-3">
                    {onDownloadPptx && (
                      <button
                        type="button"
                        onClick={onDownloadPptx}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
                        <span>Télécharger le .pptx</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setStatus("confirming")}
                      disabled={!recipient}
                      className="ml-auto flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all shadow-md shadow-teal-500/20 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>Envoyer avec Gmail</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Success State */
              <div className="py-6 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white font-display">
                    E-mail Envoyé avec Succès !
                  </h4>
                  <p className="text-xs text-slate-300">
                    Le dossier WAVICA 2.0 a été transmis à <strong>{recipient}</strong> depuis votre compte Gmail.
                  </p>
                  {sentMessageId && (
                    <span className="text-[10px] text-slate-500 font-mono block pt-1">
                      ID Message : {sentMessageId}
                    </span>
                  )}
                </div>

                <div className="pt-3 flex justify-center gap-3">
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    Envoyer un autre e-mail
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all"
                  >
                    Terminé
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
