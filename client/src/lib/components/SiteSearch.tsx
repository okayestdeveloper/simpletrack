import { ChangeEvent, useState } from 'react';

function SiteSearch() {
  const [ value, setValue ] = useState('');

  function onChange({ target: { value: val } }: ChangeEvent<{ name: string; value: unknown; }>) {
    setValue(val as string);
  }

  function handleSearch() {
    console.info(`search ${value}`);
  }

  return (
    <div className="site-search">
      <input type="text" value={value} onChange={onChange} />
      <button type="button" className="" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SiteSearch;
