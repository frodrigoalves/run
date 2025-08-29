{
  description = "Meu projeto Next.js com deploy-rs";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    deploy-rs.url = "github:serokell/deploy-rs";
  };

  outputs = { self, nixpkgs, deploy-rs }: {
    # defina aqui os pacotes, apps ou shells que deseja expor
  };
}
