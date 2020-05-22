To start scss compilation :
`npm run watch-css`

To start the project :
* `npm install`
* `npm start`

Usage :
* Drag and drop nodes from tray.
* Use mouse scroll to zoom in and out.
* `Shift + Left click` : Select component.
* `End` to delete component.
* Double Click _Scene Node_ to edit.

Components/classes of a diagram :
* widget
* model
* factory

Terms :
* Engine : Installs and registers factories and models.
* Model : JSON object of the diagram.
* Serialize and Deserialize : Creating custom JSON from model.

Structure :
* TrayItemWidget : React component for displaying node name.
* TrayWidget : React component displaying available nodes.
* CustomDiagramWidget : Overrides delete and backspace key property.
* Tray + Diagram  = Bodywidget.
* Application : Superset of engine.
* Rdrag : BodyWidget with prop as app.
