import { useEffect, useState } from 'react';
//import "./Sites.css";
import { Link } from 'react-router-dom';
//import "./SiteDetail.jsx"

export default function Sites() {
  const sitesData = []
  const [data, setData] = useState([]);
  const [form, setForm] = useState(true);
  const [newName, setNewName] = useState('');
  const [hidden, setHidden] = useState(true)
  const [status, setStatus] = useState(null);
  const [maintenanceId, setMaintenanceId] = useState([])

  useEffect(() => {
    fetch("http://localhost:8081/sites")
      .then(res => res.json())
      .then(res2 => setData(res2))
  }, [])


  function deleteSite(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this?')

    if (confirmDelete) {
      fetch(`http://localhost:8081/sites/${id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          if (res.ok) {
            alert('Site deleted!')
            window.location.reload();

          } else {
            setStatus('Failed to delete')
          }
        })
    } else {
      console.log('Delete action was canceled')
    }
  }

  function createNewSite(newSite) {
    if (newSite == '') {
      alert('Enter a Name')
      return
    }
    fetch('http://localhost:8081/sites', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newSite
      })
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Server Response:", data)
        // console.log(data.succeess)
        if (data.succeess == true) {
          alert('Request Submitted!')
          //formData ={};
          window.location.reload();
          //console.log('Request submitted')
        } else {
          console.log('Failed to submit a Request')
        }
      })
      .catch((error) => {
        console.log('Catching errors!')
      })
  }


  const inputChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
      <div>
        <button className='RemovesiteTrigger' onClick={() => { setHidden(!hidden) }}>Remove Sites</button>
      </div>

      <div>
        <h1 className='title'>Site List</h1>
      </div>

      <div className='sitelist'>
        {data.map((site) => (
          <div key={site.id} className='site-box'>
            <Link to={`/sites/${site.id}`} className='site-link'>{site.name}</Link>
            <button hidden={hidden} className='delButton' onClick={() => { deleteSite(site.id) }}>X</button>
          </div>
        ))}
      </div>

      <div className='newSiteButton'>
        <button onClick={() => { setForm(false) }}>Add New Site</button>
      </div>

      <div hidden={form} className='newSiteForm'>
        <button id='xbtn' onClick={() => { setForm(true) }}>X</button>
        <div>
          <h1 className='siteInputLabel'>Add New Site</h1>
          <div>
            <input className='siteInput' defaultValue='  New Site Name' type="text" onChange={inputChange} />
          </div>
          <button className='siteSubmitButton' onClick={() => { createNewSite(newName) }}>Submit</button>
        </div>
      </div>

    </>
  )
}