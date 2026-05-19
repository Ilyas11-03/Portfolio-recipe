import PropTypes from 'prop-types';

function CustomImage({ imgSrc }) {
    return (
        <div className="custom-image" style={{paddingTop: "70%"}}>
            <img src={imgSrc} alt="" id="pic" />
        </div>
    )
}

CustomImage.propTypes = {
    imgSrc: PropTypes.string.isRequired,
};

export default CustomImage