import { Header } from "../Components/Header";
import './Error.css'

export function Error () {
    return (
        <>
            <Header />
            <div className = "error-message-container">
                <p className="error-message">Page not found</p>
            </div>
        </>
    )
}