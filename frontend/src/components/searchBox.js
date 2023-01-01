import { DownOutlined } from '@ant-design/icons';
import { Select, Input, Space } from 'antd';
import { useOusider } from '../containers/hooks/useOusider';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../css/searchBox.css'

// Select: https://ant.design/components/select


const selectOptions = [
  { value: 'select', label: '請選擇', },
  { value: 'classNumber', label: '流水號', },
  { value: 'postTitle', label: '貼文標題', },
  { value: 'className', label: '課程名稱', },
  { value: 'teacherName', label: '老師名稱', },
  { value: 'tag', label: 'tag', },
]

const SearchBox = ({ handleSearchInfo }) => {
  const { displayStatus } = useOusider();
  const [searchOption, setSearchOption] = useState("select");
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    if (keyWord === "" || searchOption === "select")
      return;
    handleSearchInfo({
      option: searchOption,
      content: keyWord
    })
  }, [keyWord])

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
          onChange={(value) => setSearchOption(value)}
          options={selectOptions}
        />
        <Input.Search
          // ref={msgRef} // 把 msgRef 指定給 <Input.Search ref>
          style={{
            display: 'inline-block',
            marginTop: 8,
            marginBottom: 8,
            marginRight: 8,
            // width: '80%'
          }}
          value={keyWord} // default value to be displayed on page load
          onChange={(e) => setKeyWord(e.target.value)}
          placeholder="Type here..."
          onSearch={(content) => {
            console.log("Input.Search - onSearch:", content);

            if (searchOption === "selection") {
              displayStatus({
                type: 'error',
                msg: 'Please choose options!'
              })
              return;
            }
            if (!content) {
              displayStatus({
                type: 'error',
                msg: 'Please input something!'
              })
              return;
            }
            setKeyWord(content);
          }}
        ></Input.Search>
      </div>
    </>
  )
}

export default SearchBox;