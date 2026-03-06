const Footer = () => {
  return (
    <footer className="mt-auto py-8 px-4 border-t border-border/30">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 AI Background Remover</p>
        <div className="flex gap-6">
          <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
