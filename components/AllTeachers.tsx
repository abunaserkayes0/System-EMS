import useFetch from '@/hooks/useFetch';
import React from 'react'
import SingleTeacher from './SingleTeacher';
import Spinner from './Spinner';

export default function AllTeachers() {
    const { data, loading } = useFetch("http://143.110.190.164:3001/admin/teacher/profile/find/all");  
    return (
      <>
        <div>
          {loading ? (
             <Spinner />
          ) : (
            data.map((singleData, index) => (
              <SingleTeacher key={index} singleData={singleData} />
            ))
          )}
        </div>
      </>
    );
}
