import React, {useState} from 'react'
import Select from 'react-select'

const BirthYear = props => {

    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [year, setYear] = useState('')

    const options = props.authors.map(author => {
        return {
            value: author.name,
            label: author.name
        }
    })

    const onAuthorChange = selectedOption => {
        setSelectedAuthor(selectedOption.value)
    }

    const onAuthorUpdate = async () => {
        await props.setBirthYear({
            variables: {
                name: selectedAuthor,
                setBornTo: parseInt(year)
            }
        })

        setSelectedAuthor('')
        setYear('')
    }

    return (
        <>
            <Select 
                value={selectedAuthor}
                onChange={onAuthorChange}
                options={options}
            />
            born
            <input
                type='number'
                value={year}
                onChange={({ target }) => setYear(target.value)}
            />
            <button onClick={onAuthorUpdate}>update author</button>
        </>
    )
}

export default BirthYear;