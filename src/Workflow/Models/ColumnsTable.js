import React, { Component } from "react";
import ReactDOM from "react-dom";
import jexcel from "jexcel";
import Axios from "axios";

import "./styles.css";
import "../../../node_modules/jexcel/dist/jexcel.css";

class ColumnsTable extends React.Component {
    constructor(props) {
        super(props);
        var data = [
            ['Username', 'V_String', true, true,''],
            ['Firstname', 'V_String', false, true,''],
            ['Email', 'V_String', false, true,''],
            ['Phone', 'V_String', false, true,''],
            ['Password', 'V_String', false, true,''],
        ];
        this.options = {
        data:data,
        columns: [
            { type: 'text', title:'Column Name', width:120 },
            { type: 'dropdown', title:'Type', width:200, source:[ "W_String", "V_String", "Integer","Double", "Float", "Boolean", "Timestamp",  "Date"] },
            { type: 'checkbox', title:'Unique', width:80 },
            { type: 'checkbox', title:'Required', width:80 },
            { type: 'text', title:'Default', width:100 },
         ],
        onchange: this.changed,
        columnDrag:true,
        allowManualInsertRow: false,
        persistance: '/jexcel/v4/save',
        // onbeforechange: beforeChange,
        oninsertrow: this.insertedRow,
        // oninsertcolumn: insertedColumn,
        // ondeleterow: deletedRow,
        // ondeletecolumn: deletedColumn,
        // onselection: selectionActive,
        // onsort: sort,
        // onresizerow: resizeRow,
        // onresizecolumn: resizeColumn,
        // onmoverow: moveRow,
        // onmovecolumn: moveColumn,
        // onload: loaded,
        // onblur: blur,
        // onfocus: focus,
        // onpaste: paste,
        // toolbar:[
        //   {
        //       type: 'i',
        //       content: 'undo',
        //       onclick: function() {
        //          // table.undo();
        //       }
        //   },
        //   {
        //       type: 'i',
        //       content: 'redo',
        //       onclick: function() {
        //          // table.redo();
        //       }
        //   },
        // ]
        };
    }

    componentDidMount = function() {
        this.el = jexcel(ReactDOM.findDOMNode(this).children[1], this.options);

    }

    addRow = function() {
        this.el.insertRow([ '', 'V_String', false, true,'']);
       console.log( this.el.getRowData(0));
    }
    saveFields = function() {
        
       console.log( this.el.getData());

       
      let records =  [["sb", "Michael", "mike@zmc.co.ke", "+25412342121", "#passw0rd"],["sds", "", "", "", ""]]
      let headers =  [['Username','test'],['Firstname'],['Email'],['Phone'],['Password']]
      let arr_objs_records = []
      let arr_objs_headers = []

      records.forEach(record => {
        let obj_rec = {}
        let count = 0
        headers.forEach( item => {
          obj_rec[item[0]] = record[count]
          count++
        })
        arr_objs_records.push(obj_rec)
      });

       Axios.post("http://localhost:5000/save-fields", arr_objs_records[0])
          .then((response) => {
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    }

    insertedRow = function(instance) {
        console.log(instance);  
      }

    changed = function(instance, cell, x, y, value) {

          var cellName = jexcel.getColumnNameFromId([x,y]);
       
          console.log(x + ' ' + y);

          if(cellName.includes('A')){
              console.log("save to database");
          }
    }

    render() {
        return (
            <div>
                <div>
                <input type='button' value='Add new Column' onClick={() => this.addRow()}></input>
                <input type='button' value='Save columns' onClick={() => this.saveFields()}></input>
                </div>
                
                <div></div><br/><br/>
            </div>
        );
    }
}

export default ColumnsTable;