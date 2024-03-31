import React, { ReactNode } from "react";

import Menu from "../components/Menu";

interface PortalLayoutProps {
    children: ReactNode;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
    return (
        <>
           
            <Menu />
            <main>
                {children}
            </main>
        </>
    );
}

export default PortalLayout;
