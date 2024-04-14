import Footer from "./Footer";
import './css/Card.css';


const Homepage = () => (
    <div className="Homepage " style={{ fontFamily: 'Courier New' }}>
        <div className="m-4">
            <h1 >Home</h1>
            <hr />
            <h3>Welcomne to the student made To Do List Application!</h3>
        </div>



        <div className="container">
            <div className="row">
                <div className="col-md-7 col-12">
                    <div className="card rounded border border-dark card-1 ">
                        <div className="card-body">
                            <h4 className="card-title fw-bold mb-5">To Do List Application</h4>

                            <p className="card-text">Organize Your Life, Achieve More. To Do List Application helps you stay organized, focused, and productive. With intuitive features and customizable lists, managing your tasks has never been easier. Boost productivity, reduce stress, and achieve your goals with To Do List Appliaction. Start organizing your life today!</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-12">
                    <div className="card rounded h-80 border border-dark card-2">
                        <div className="card-body">
                            <h4 className="card-title fw-bold mb-5">About us</h4>

                            <p className="card-text">Discover the story behind To Do List Application. Learn about our mission, values, and the team dedicated to bringing you the best productivity tool. Click below to find out more.</p>
                            <a className="btn btn-light border border-2 border-dark float-end" href="/about">About</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5">
            <Footer name="Website Made By: Hugo, Kim & Ella. Year 2024. Class: INF23F-Å." styling="text-light text-center border border-dark  p-3"></Footer>
        </div>
    </div>



); export default Homepage;