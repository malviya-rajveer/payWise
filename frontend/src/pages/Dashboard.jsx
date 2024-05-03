import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = ()=>{
return <div className="bg-slate-900 h-screen" >
    <Appbar />
    <div className="m-8">
            <Balance value={"400,000"} />
            <Users />
        </div>
</div>

}