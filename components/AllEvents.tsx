import useFetch from '@/hooks/useFetch';
import React from 'react'
import SingleTeacher from './SingleTeacher';
import SingleEvent from './SingleEvent';
import Spinner from './Spinner';

export default function AllEvents() {
    const { data, loading } = useFetch("http://143.110.190.164:3001/teacher/event/find/all");  
    return (
      <>
        <div>
          {loading ? (
             <Spinner />
          ) : (
            data.map((singleData, index) => (
              <SingleEvent key={index} singleData={singleData} />
            ))
          )}
        </div>
      </>
    );
}
