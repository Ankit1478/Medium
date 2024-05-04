import { Auth } from "../components/Auth"
import { Quotes } from "../components/Quotes"
import { SigninAuth } from "../components/SignInAuth"

export const Signin = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <SigninAuth type="signin"></SigninAuth>
            </div>
            <div className="invisible lg:visible">
                <Quotes></Quotes>
            </div>
            <div></div>
        </div>

    </div>
}