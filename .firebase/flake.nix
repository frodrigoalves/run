{
  "description": "Meu projeto Next.js com deploy-rs",
  "inputs": {
    "nixpkgs": {
      "url": "github:NixOS/nixpkgs/nixpkgs-unstable"
    },
    "deploy-rs": {
      "url": "github:serokell/deploy-rs"
    }
  },
  "outputs": {
    "self": _,
    "nixpkgs": _,
    "deploy-rs": _
  }: let
    forAllSystems = nixpkgs.lib.genAttrs [
      "x86_64-linux"
      "aarch64-linux"
      "x86_64-darwin"
      "aarch64-darwin"
    ];
    pkgsFor = forAllSystems (system:
      import nixpkgs {
        inherit system;
        overlays = [deploy-rs.overlay];
      });
  in {
    devShells = forAllSystems (system: let
      pkgs = pkgsFor."${system}";
    in {
      default = pkgs.mkShell {
        name = "rodrigo.run";
        packages = with pkgs; [
          nodejs_20
          pnpm
        ];
      };
    });
  }
}
