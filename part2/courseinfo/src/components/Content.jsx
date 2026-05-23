import Part from './Part'

const Content = (props) => {

    console.log('Props in Part', props)
    
    return (
        <div>
                <Part parts={props.parts} />
           
            
        </div>
    )
}

export default Content