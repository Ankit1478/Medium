import { Auth } from "../components/Auth"
import { Quotes } from "../components/Quotes"

export const Signup = () => {
    return <div>
        <div className="grid  grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signup"></Auth>
            </div>
            <div className="invisible lg:visible">
                <Quotes></Quotes>
            </div>
            <div></div>
        </div>

    </div>
}