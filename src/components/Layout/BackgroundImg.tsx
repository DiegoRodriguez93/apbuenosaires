import bgIMG from './obelisco.jpg';
import "./background.css"

const BackgroundImg = () => {
  return (
    <div className='image-container'>
      <img style={{ width: '100%'  }} src={bgIMG} alt="" />
    </div>
  );
};

export default BackgroundImg;
