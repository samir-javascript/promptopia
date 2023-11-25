// this is the structure of the entire app
import '../globals.css'
import Navbar from "@/components/Navbar";


const layout = ({ children }) => {
  return (
    <>
    <div className='main'>
       <div className='gradient' />
    </div>
    <main className='app'>
          <Navbar />
          {children}
    </main>
    </>
    
  );
};

export default layout;

