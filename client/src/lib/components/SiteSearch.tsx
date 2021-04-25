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
    <div className="site-search control flex w-full">
      <input type="text" className="w-3/4 input rounded-r-none" value={value} onChange={onChange} />
      <button type="button" className="w-1/4 button border-l-0 rounded-l-none" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SiteSearch;
