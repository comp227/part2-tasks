const Footer = () => {
    const footerStyle = {
        marginTop: 30,
        paddingBottom: 15,
        backgroundColor: 'black',
        color: 'orange',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Task app, Department of Computer Science, University of the Pacific 2023</em>
        </div>
    )
}

export default Footer;