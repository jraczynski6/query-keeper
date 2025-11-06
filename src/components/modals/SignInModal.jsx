export default function SignInModal() {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close">X</button>
                <h2>Sign-In</h2>
                <form className="sign-in-form">
                    <label>
                        Username
                        <input type="text" name="username" required />
                    </label>

                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>

                    <button type="submit">Sign-In</button>
                </form>
            </div>
        </div>
    )
}