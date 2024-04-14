import Footer from "./Footer";

const About = () => (
    <div className="About" style={{ fontFamily: 'Courier New' }}>
        <div className="m-4">
            <h1>About</h1>
            <hr />
            <h3>Information about the story behind the devleopment of the application and the team.</h3>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-10 col-12">
                    <div className="card rounded card-3 border border-dark" >
                        <div className="card-body">
                            <h4 className="card-title fw-bold mb-5">History</h4>

                            <p className="card-text">We were assigned to develop a full-stack project. Therefore, we decided to create a to-do list app. An application where users can write down their tasks and check them off once completed.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 col-12">
                    <div className="card rounded h-80 card-4 border border-dark">
                        <div className="card-body">
                            <h4 className="card-title fw-bold mb-5">The Team</h4>
                            <p className="card-text"> The team consists of three IT business students. Their names are Hugo, Ella & Kim. They are a strong team with diverse strengths in coding. Hugo is an expert in Back End coding, and Kim specializes in mobile app development. Ella enjoys both designing and creating mobile apps. </p>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
        
        <div className="mt-5">
            <Footer name="Website Made By: Hugo, Kim & Ella. Year 2024. Class: INF23F-Å." styling="text-light text-center border border-dark  p-3"></Footer>
        </div>  
    </div>
);
export default About;