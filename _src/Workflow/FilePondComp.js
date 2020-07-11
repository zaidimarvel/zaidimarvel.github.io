import React from "react";
import ReactDOM from "react-dom";
// Import React FilePond
import { FilePond, registerPlugin , setOptions  } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class FilePondComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // Set initial files, type 'local' means this is a file
        // that has already been uploaded to the server (see docs)
        node: null,
        files: [
        ]
      };
  }

  componentDidMount = function() {
   
  };
  handleProcess(error, file) {
    let payload = JSON.parse(this.pond.getFile().serverId);

    console.log(payload);
    
    
    console.log("Works Just Fine");
    
    let node = this.props.node;
    let model = this.props.model;
    let currNode = model.getNode(node.id)

    // currNode.properties.outputData = event.target.value.split(',')
    currNode.properties.file = payload.file_name;
    currNode.properties.message = "Select sheet"
    currNode.properties.sheets = payload.sheets

    this.setState({ files: [
      {
        source: payload.file_name,
        options: {
          type: "local"
        }
      }
    ]})

    this.props.updateNode()

    

    // let path = file.serverId.replace(/['"]+/g, "");
    // console.log(path);
    // this.uploadsData.filename = file.filename;
    // this.uploadsData.filepath = path;

    
  }
 
  handleInit() {
    console.log("FilePond instance has initialised", this.pond);

    if(this.props.file_name){
      this.setState({ files: [
        {
          source: this.props.file_name,
          options: {
            type: "local"
          }
        }
      ]})
    }
  
    
    
  }


  render() {
    return (
        <div className="App">
          {/* Pass FilePond properties as attributes */}
          <FilePond
            ref={ref => (this.pond = ref)}
            files={this.state.files}
            // allowMultiple={true}
            server={
              {
                      url: 'http://127.0.0.1:5000',
                      process: {
                          url: '/upload',
                          method: 'POST',
                          withCredentials: false,
                          headers: {},
                          timeout: 100000,
                          onload: null,
                          onerror: null
                      }
                  }}
            maxFiles={3}
            oninit={() => this.handleInit()}
            onprocessfile={() => this.handleProcess()}
            // onupdatefiles={fileItems => {
            //   // Set currently active file objects to this.state
            //   this.setState({
            //     files: fileItems.map(fileItem => fileItem.file)
            //   });
            // }}
          />
        </div>
      );
  }
}

export default FilePondComp;