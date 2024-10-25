export default function Header() {
  return (
    <header className="mb-4">
      <div className="title">
          <h1 className="">Union Bank</h1>
      </div>
      <div className="p-3 shadow  mx-4 mb-4 mt-3 box">
            <p className="fw-bold p-0 m-0 ">Hello, Union Bank Customer</p>
            <p style={{fontSize:"12px"}} className="fw-bold p-0 m-0 mt-1">Complete your account details in few simple steps enter details below and click verify.</p>
      </div>
      <div className="text-center py-2">
        <img src="/head.png" width="240px" />
      </div>
      <div className="text-center my-4">
        <p className="fw-bold" style={{fontSize:"10px"}}>Customer service: 02261156300 | Toll Free Number-cpl-c 02232322727</p>
      </div>
    </header>
  );
}
