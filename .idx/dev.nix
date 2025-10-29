
{ pkgs, ... }: {
  # Nix channel to use.
  channel = "stable-24.05";

  # Packages to make available in the environment.
  packages = [
    pkgs.maven
    pkgs.jdk17
    pkgs.nodejs_20
  ];

  # Environment variables are loaded from the .env file in the onStart hook.
  # VS Code extensions to install.
  idx.extensions = [
    "vscjava.vscode-java-pack"
    "dbaeumer.vscode-eslint"
  ];

  # Workspace lifecycle hooks.
  idx.workspace = {
    # Runs when the workspace is first created.
    onCreate = {
      backend-install = "cd backend && mvn install";
      frontend-install = "cd frontend && npm install";
    };
    # Runs every time the workspace is (re)started.
    onStart = {
      backend-start = "export $(grep -v '^#' ../.env | xargs) && cd backend && mvn spring-boot:run";
    };
  };

  # Configure web previews.
  idx.previews = {
    enable = true;
    previews = {
      backend = {
        port = 8080;
        label = "Backend";
      };
      frontend = {
        command = ["sh" "-c" "cd frontend && npm run dev -- --port $PORT"];
        manager = "web";
        label = "Frontend";
      };
    };
  };
}
