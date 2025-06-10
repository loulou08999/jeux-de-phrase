import React, { useState } from "react";

const AuthMenu: React.FC = () => {
  const [view, setView] = useState<"menu" | "login" | "register">("menu");

  return (
    <div>
      {view === "menu" && (
        <div>
          <button onClick={() => setView("login")}>Se connecter</button>
          <button onClick={() => setView("register")}>Créer un compte</button>
        </div>
      )}
      {view === "login" && (
        <div>
          <h2>Connexion</h2>
          {/* Formulaire de connexion (placeholder) */}
          <form>
            <input type="text" placeholder="Nom d'utilisateur" />
            <input type="password" placeholder="Mot de passe" />
            <button type="submit">Se connecter</button>
          </form>
          <button onClick={() => setView("menu")}>Retour</button>
        </div>
      )}
      {view === "register" && (
        <div>
          <h2>Créer un compte</h2>
          {/* Formulaire de création de compte (placeholder) */}
          <form>
            <input type="text" placeholder="Nom d'utilisateur" />
            <input type="password" placeholder="Mot de passe" />
            <input type="password" placeholder="Confirmer le mot de passe" />
            <button type="submit">Créer un compte</button>
          </form>
          <button onClick={() => setView("menu")}>Retour</button>
        </div>
      )}
    </div>
  );
};

export default AuthMenu;
