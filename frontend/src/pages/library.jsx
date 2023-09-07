import React, { useEffect, useState } from "react";
import axios from '../api/axios';
import config from '../config/config';
import Button from "../components/button";
import MessageLabel from "../components/messageLabel";

const LibraryPage = () => {

    const [books, setBooks] = useState([]);

    const fetchFiles = async(e) => {
        try {
            const response = await axios.get(
                config.LIST_FILES_URL,
                config.HEADERS
            );
            
            if (response.data){
                let dataObject = []
                for (var id in response.data){
                    dataObject.push({
                        id: id,
                        book: response.data[id].name,
                        url: response.data[id].url
                    })
                }
                setBooks(dataObject);
            }
        } catch(err) {

        }
    }

    const handleUploadOpen = () =>{

    }

    useEffect(() => {
        fetchFiles()
    })

    return (
        <div className="library_page">
            <h1>Library</h1>
            <div className="lib-toolbar">
                <Button onClick={handleUploadOpen}>Upload a book</Button>
                <div className="filters"><MessageLabel>Filters</MessageLabel></div>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>File name <span className="sortIcon" id="filename"></span></td>
                        <td>Download</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map((val, key) => {
                        // console.log(key + " - " + val);
                        return (
                            <tr key={key}>
                                <td>{val.book}</td>
                                <td><a href={val.url}>{val.url}</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default LibraryPage;