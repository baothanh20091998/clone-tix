import React from 'react'
import Header from '../components/header/header.page'

export default function AuthTemplate(props) {
    const { children } = props;
    return (
        <>
            <header>
                <Header />
            </header>
            <main className="auth">
                {children}
            </main>
        </>
    )
}
