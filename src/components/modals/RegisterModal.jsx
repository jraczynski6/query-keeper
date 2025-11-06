export default function RegisterModal() {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close">X</button>
                <h2>Register</h2>
                <form className="register-form">
                    <label>
                        Username
                        <input type="text" name="username" required />
                    </label>

                    <label>
                        Email
                        <input type="email" name="email" required />
                    </label>

                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}