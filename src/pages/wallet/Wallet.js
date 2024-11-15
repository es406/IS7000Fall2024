import React, { useState } from 'react';

const dummyData = [
  { company: 'Microsoft', amount: 100, date: '2023-01-01' },
  { company: 'Apple', amount: 200, date: '2023-01-02' },
  { company: 'Amazon', amount: 300, date: '2023-01-03' },
  { company: 'Google', amount: 400, date: '2023-01-04' },
  { company: 'Facebook', amount: 500, date: '2023-01-05' },
  { company: 'IBM', amount: 600, date: '2023-01-06' },
  { company: 'Oracle', amount: 700, date: '2023-01-07' },
  { company: 'SAP', amount: 800, date: '2023-01-08' },
  { company: 'Salesforce', amount: 900, date: '2023-01-09' },
  { company: 'Adobe', amount: 1000, date: '2023-01-10' },
  { company: 'Intel', amount: 1100, date: '2023-01-11' },
  { company: 'Cisco', amount: 1200, date: '2023-01-12' },
  { company: 'HP', amount: 1300, date: '2023-01-13' },
  { company: 'Dell', amount: 1400, date: '2023-01-14' },
  { company: 'VMware', amount: 1500, date: '2023-01-15' },
  { company: 'Intuit', amount: 1600, date: '2023-01-16' },
  { company: 'ServiceNow', amount: 1700, date: '2023-01-17' },
  { company: 'Square', amount: 1800, date: '2023-01-18' },
  { company: 'Shopify', amount: 1900, date: '2023-01-19' },
  { company: 'Workday', amount: 2000, date: '2023-01-20' },
];
const initialFailedTransactions = [
  { company: 'Microsoft', amount: 100, date: '2023-01-01', reason: 'Insufficient funds' },
  { company: 'Apple', amount: 200, date: '2023-01-02', reason: 'Card expired' },
  { company: 'Amazon', amount: 300, date: '2023-01-03', reason: 'Network error' },
  { company: 'Google', amount: 400, date: '2023-01-04', reason: 'Insufficient funds' },
  { company: 'Facebook', amount: 500, date: '2023-01-05', reason: 'Card expired' },
];

function Wallet() {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = dummyData.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [failedTransactions, setFailedTransactions] = useState(initialFailedTransactions);
  const [newCompany, setNewCompany] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newReason, setNewReason] = useState('');

  const addFailedTransaction = () => {
    const newTransaction = {
      company: newCompany,
      amount: parseFloat(newAmount),
      date: newDate,
      reason: newReason,
    };
    setFailedTransactions([...failedTransactions, newTransaction]);
    setNewCompany('');
    setNewAmount('');
    setNewDate('');
    setNewReason('');
  };

  return (
    <>

      <div className='text-black flex flex-col items-center w-full h-screen p-4 bg-white'>

        <h1 className='text-4xl mb-4'>Wallet Transactions</h1>
        <div className='w-full max-w-4xl'>
          {currentTransactions.map((transaction, index) => (
            <div key={index} className='bg-gray-800 p-4 mb-2 rounded'>
              <p>Company: {transaction.company}</p>
              <p>Amount: ${transaction.amount}</p>
              <p>Date: {transaction.date}</p>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-4'>
          {[...Array(Math.ceil(dummyData.length / transactionsPerPage)).keys()].map(number => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 mx-1 ${currentPage === number + 1 ? 'bg-blue-500' : 'bg-gray-700'} rounded`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h1 className='text-4xl mb-4'>Failed Transactions Overview</h1>
        <div className='w-full max-w-4xl'>
          <div className='bg-gray-200 p-4 mb-4 rounded'>
            <h2 className='text-2xl mb-2'>Failed Transactions</h2>
            {failedTransactions.map((transaction, index) => (
              <div key={index} className='bg-gray-100 p-4 mb-2 rounded'>
                <p>Company: {transaction.company}</p>
                <p>Amount: ${transaction.amount}</p>
                <p>Date: {transaction.date}</p>
                <p>Reason: {transaction.reason}</p>
              </div>
            ))}
          </div>
          <div className='bg-gray-200 p-4 mb-4 rounded'>
            <h2 className='text-2xl mb-2'>Add New Failed Transaction</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addFailedTransaction();
              }}
            >
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='company'>
                  Company
                </label>
                <input
                  type='text'
                  id='company'
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='amount'>
                  Amount
                </label>
                <input
                  type='number'
                  id='amount'
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='date'>
                  Date
                </label>
                <input
                  type='date'
                  id='date'
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='reason'>
                  Reason
                </label>
                <input
                  type='text'
                  id='reason'
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  required
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Add Failed Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Wallet;
