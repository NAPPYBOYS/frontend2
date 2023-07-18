
export enum ProcessModelType {
    BaselineProcessModel = "BaselineProcessModel",
    LearnedProcessModel = "LearnedProcessModel"
}
interface ProcessModelProps {
     type:any,
     id: string
}

export const ProcessModelView = (props: ProcessModelProps) => {
    return (
        <div>
            <h1>Process Model</h1>
            <ul>
                <li>{props.type}</li>
                <li>{props.id}</li>
            </ul>
        </div>
    );
}

//TODO: Add Trained Model Visualization
