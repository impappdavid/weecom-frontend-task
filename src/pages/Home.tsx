import Header from "@/components/mycomponents/Header"
import Products from "@/components/mycomponents/Products/Products"
import Sidebar from "@/components/mycomponents/Sidebar"

function Home() {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="flex flex-col w-full h-screen overflow-hidden">
                    <Header />
                    <Products />
                </div>
            </div>
        </>
    )
}

export default Home