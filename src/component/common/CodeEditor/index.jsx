import ReactJsoneditor from "jsoneditor-for-react";


let demo = {
	name: "jamim"
}
export default function CodeEditorLocal({ setTask, data }) {
	const handleChange = () => {

	}
	return (
		<ReactJsoneditor values={demo} onChange={handleChange} />
	);
}
