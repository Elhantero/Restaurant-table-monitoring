import React, { PropsWithChildren } from 'react';
import { BodyWrapper, Article, Nav } from "./styled/styledComponents";
import Header from "./Header";
import Footer from "./Footer";

export default ({ children } : PropsWithChildren) => {
    return (
        <BodyWrapper>
            <Header />
            <Nav>There can be some stat</Nav>
            <Article>
                {children}
            </Article>
            <Footer />
        </BodyWrapper>
    );
};

