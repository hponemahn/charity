import React from "react";
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Header from "./Header";

const Layout = props => {
    return <Container>
        <Header />
        {props.children}
    </Container>
}

export default Layout;