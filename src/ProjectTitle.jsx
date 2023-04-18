const ProjectTitle = props => {
    return (
        <section className="d-flex flex-row justify-content-center mt-5 zoom-in">
            <p className="fw-light fs-8">
                <span className="fw-bolder">{props.name}</span> data sourced from <span className="fst-italic">{props.source}</span>
            </p>
        </section>
    ) 
}

export default ProjectTitle