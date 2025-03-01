import Header from "@/components/custom/header/Header";
import AuroraBackground from "@/components/wrapper/aurora_backgorund";
import ContextMenuWrap from "@/components/wrapper/contextmenuwrap";

export default function MainLayout({ children }) {
  return (
    <ContextMenuWrap className="select-none">
      <AuroraBackground />
      <div className="page relative z-10">
        <Header />
        {children}
      </div>
    </ContextMenuWrap>
  );
}
