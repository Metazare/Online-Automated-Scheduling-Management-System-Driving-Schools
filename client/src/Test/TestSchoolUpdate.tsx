import React, {useState, useEffect} from 'react'

import useReqSchool from '../Hooks/useReqSchool';
import useFirebase from '../Hooks/useFirebase';


type Props = {}

export default function TestSchoolUpdate({}: Props) {


  const {uploadFile} = useFirebase();
  const {data, getSchool, loading, error, editSchool} = useReqSchool();

  const [form, setForm] = useState<any>({
    schoolId: '',
    name: '',
    email: '',
    about: '',
    address: '',
    contact: '',
    profile: '',
  })

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        await getSchool({
          schoolId: null,
        });
      } catch (error) {
        // Handle error if needed
        console.error('Error fetching school data: ', error);
      }
    };
  
    fetchSchoolData();
  }, []);
  
  useEffect(() => {
    if (data) {
      setForm({
        schoolId: data.schoolId || "",
        name: data.name || "",
        email: data.email || "",
        about: data.about || "",
        address: data.address || "",
        contact: data.contact || "",
        profile: data.profile || "",
      });
    }
  }, [data]);

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form)
    editSchool(form);
  }
  
  async function uploadProfile(file) {
    const url = await uploadFile(file, 'oasms');
    setForm({
      ...form,
      profile: url
    })
    console.log( url)
  }

  if (loading) {
    return <div>Loading...</div>
  }


  return (
    <div>
      {data && 
        <form onSubmit={updateProfile}>
          <input type="text" placeholder='name' value={form.name} onChange={(e)=>{setForm({...form, name: e.target.value})}} />
          <input type="text" placeholder='email' value={form.email} onChange={(e)=>{setForm({...form, email: e.target.value})}} />
          <input type="text" placeholder='about' value={form.about} onChange={(e)=>{setForm({...form, about: e.target.value})}} />
          <input type="text" placeholder='address' value={form.address} onChange={(e)=>{setForm({...form, address: e.target.value})}} />
          <input type="text" placeholder='contact' value={form.contact} onChange={(e)=>{setForm({...form, contact: e.target.value})}} />
          <img src={form.profile} alt="profile" />
          <input type="file" placeholder='profile' onChange={(e:any)=>{uploadProfile(e.target.files[0])}} />
          <button type='submit'>Update</button>
        </form>
      }
    </div>
  )
}