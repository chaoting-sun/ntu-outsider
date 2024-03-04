import { DownOutlined } from '@ant-design/icons';
import { Select, Input, Space } from 'antd';
import { useOutsider } from '../containers/hooks/useOutsider';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../css/searchBox.css'

// Select: https://ant.design/components/select


const queryTypes = [
  { value: 'select',      label: '請選擇', },
  { value: 'classNo',     label: '流水號', },
  { value: 'title',   label: '貼文標題', },
  { value: 'className',   label: '課程名稱', },
  { value: 'teacherName', label: '老師名稱', },
  { value: 'tag',         label: 'tag', },
]

const SearchBox = ({ handleQueryPost }) => {
  const { displayStatus } = useOutsider();
  const [queryType, setQueryType] = useState("select");
  const [queryString, setQueryString] = useState("");

  return (
    <>
      <div className="searchInfoContainer">
        <Select
          defaultValue="select"
          // className='.ant-select-selection'
          style={{
            display: 'inline-block',
            minWidth: 100,
            maxWidth: 100,
            marginTop: 8,
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 8,
          }}
          onChange={(value) => setQueryType(value)}
          options={queryTypes}
        />
        <Input.Search
          style={{
            display: 'inline-block',
            marginTop: 8,
            marginBottom: 8,
            marginRight: 8,
            // width: '80%'
          }}
          value={queryString} // default value to be displayed on page load
          onChange={(e) => setQueryString(e.target.value)}
          placeholder="Type here..."
          onSearch={(queryContent) => {
            queryContent = queryContent.trim();
            console.log("onSearch:", queryContent);
            if (queryTypes === "selection") {
              displayStatus({
                type: 'error',
                msg: 'Please choose options!'
              })
              return;
            }
            if (queryContent === "") {
              displayStatus({
                type: 'error',
                msg: 'Please input something!'
              })
              return;
            }

            handleQueryPost(queryType, queryString)
            setQueryString("");
          }}
        ></Input.Search>
      </div>
    </>
  )
}

export default SearchBox;