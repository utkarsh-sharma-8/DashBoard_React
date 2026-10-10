import Header from "../components/Dashboard/Header/Header"
import UsersTable from "../components/Dashboard/Users/usersTable";
const DashBoard=()=>{
    return(
        <main className="min-h-screen w-full bg-slate-50 p-6 text-left">
        <Header/>
        <UsersTable/>
        </main>
    )
}

export default DashBoard;