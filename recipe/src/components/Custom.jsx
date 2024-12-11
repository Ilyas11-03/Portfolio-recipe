function CustomImage({imgSrc}) {
    return (
        <div className="custom-image" style={{paddingTop: "70%"}}>
            <img src={imgSrc} alt="" id="pic" />
        </div>
    )

}
export default CustomImage