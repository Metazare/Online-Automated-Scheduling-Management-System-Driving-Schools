import React, {useState, useEffect} from 'react'

import useReqStudent from '../Hooks/useReqStudent'


type Props = {}

export default function TestStudentUpdate({}: Props) {

  const {students, loading, error, getStudent, updateStudentProfile} = useReqStudent();

  const [form, setForm] = useState({
    studentId: '',
    email: '',
    contact: '',
    address: '',
    sex: '',
    birthday: '',
    profile: '',
  })

  useEffect(() => {
    getStudent({
      studentId: null,
      courseType: null
    });
    setForm({
      studentId:students?.studentId,
      email:students?.email,
      contact:students?.contact,
      address:students?.address,
      sex:students?.sex,
      birthday:students?.birthday,
      profile:students?.profile,
    })
  }, [])

  const updateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(form);
    updateStudentProfile(form);
  }
  
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {students && 
      <form onSubmit={updateProfile}>
        {/* <input type="text" defaultValue={form.studentId} placeholder='studentId' onChange={(e) => setForm({...form, studentId: e.target.value})} /> */}
        <input type="text" defaultValue={form.email} placeholder='email' onChange={(e) => setForm({...form, email: e.target.value})} />
        <input type="text" defaultValue={form.contact} placeholder='contact' onChange={(e) => setForm({...form, contact: e.target.value})} />
        <input type="text" defaultValue={form.address} placeholder='address' onChange={(e) => setForm({...form, address: e.target.value})} />
        <input type="text" defaultValue={form.sex} placeholder='sex' onChange={(e) => setForm({...form, sex: e.target.value})} />
        <input type="text" defaultValue={form.birthday} placeholder='birthday' onChange={(e) => setForm({...form, birthday: e.target.value})} />
        <input type="text" defaultValue={form.profile} placeholder='profile' onChange={(e) => setForm({...form, profile: e.target.value})} />
        <button type='submit'>Update</button>
      </form>
      }
    </div>
  )
}