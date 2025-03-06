import background from '../assets/background.jpg'; // Make sure the path to your image is correct
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

AOS.init();

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
      AOS.init(); // Initialize Animate On Scroll (AOS)
    }, []);
  
    const handleAuthClick = () => {
      // Navigate to the "/auth" route
      navigate('/auth');
    };
    
    return (
        <>
            <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
                <div className="w-full h-[10vh] flex justify-around items-center text-white ">
                    <div className="logo ml-16">
                        <span className="text-[#4d2be2] text-4xl font-bold">Dr</span>
                        <span className="text-red-600 text-4xl font-bold">i</span>
                        <span className="text-[#4d2be2] text-4xl font-bold">ver</span>
                        <span className="text-4xl font-bold">Net</span>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="links flex space-x-4">
                            <div className="link" data-aos="fade-up" data-aos-duration="1200">
                                <a href="" className="text-white no-underline text-xl hover:text-red-600">Home</a>
                            </div>
                            <div className="link" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                                <a href="" className="text-white no-underline text-xl hover:text-red-600">About</a>
                            </div>
                            <div className="link" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
                                <a href="" className="text-white no-underline text-xl hover:text-red-600">Services</a>
                            </div>
                            <div className="link" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="500">
                                <a href="" className="text-white no-underline text-xl hover:text-red-600">Feedback</a>
                            </div>
                            <div className="link" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="600">
                                <a href="" className="text-white no-underline text-xl hover:text-red-600">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div className="buttons w-64 flex justify-center items-center mr-16">
                        <button data-aos="fade-up" data-aos-duration="1200" data-aos-delay="800" className="mx-1 w-2/5 h-[5vh] rounded-md border-none outline-none text-xl font-bold text-white bg-red-600 transition ease-linear hover:scale-110 hover:text-1.3rem hover:bg-transparent hover:backdrop-brightness-50 hover:text-white hover:border-solid hover:border" onClick={handleAuthClick}>Login</button>
                        <button data-aos="fade-up" data-aos-duration="1200" data-aos-delay="900" className="mx-1 w-2/5 h-[5vh] rounded-md border-none outline-none text-xl font-bold text-white bg-red-600 transition ease-linear hover:scale-110 hover:text-1.3rem hover:bg-transparent hover:backdrop-brightness-50 hover:text-white hover:border-solid hover:border" onClick={handleAuthClick}>Sign up</button>
                    </div>
                </div>

                <section className="w-full h-[90vh] flex justify-center items-center">
                    <div className="content w-2/5 text-center text-gray-200  ml-[-20px]">
                        <h1 data-aos="fade-right" data-aos-duration="2000" data-aos-delay="900" className="text-5xl font-bold" style={{ textShadow: '0 0 10px black' }}>
                            Efficient Bus <span className="text-red-600 text-5xl font-bold" style={{ textShadow: '0 0 4px white' }}>Driver</span> for <br />Safe <span className="text-[#4d2be2] text-5xl font-bold" style={{ textShadow: '0 0 4px white' }}>Management</span> and Timely Journeys.
                        </h1>

                        <p data-aos="fade-left" data-aos-duration="2000" data-aos-delay="1000" className="w-[60%] mx-[20%] my-5 text-[18px]">Optimizing Bus Driver Schedules for Enhanced Efficiency and Passenger Safety Every Journey.</p>
                        <button data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="1200" className="w-2/5 h-[7vh] rounded-lg bg-red-600 border-none outline-none text-white cursor-pointer text-xl font-bold transition ease-linear hover:scale-110 hover:text-1.3rem hover:bg-transparent hover:backdrop-brightness-50 hover:text-white hover:border-solid hover:border">MANAGE SCHEDULE</button>
                    </div>
                </section>

            </div>
        </>
    );
}

export default Home;
