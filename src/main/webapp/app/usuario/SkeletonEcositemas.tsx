import { Skeleton } from 'primereact/skeleton';
import React from 'react';

const SkeletonEcositemas = () => {
  return (
    <div>
      <div className=" grid mt-4 mb-4">
        <div className="flex flex-row col-12"></div>
        <div className="flex  flex-column col-12 lg:flex-row">
          <div className=" col-12 xl:col-12 sm:col-12 md:col-12">
            <div className="flex sm:justify-content-end align-items-center text-700">
              <div className=" flex  align-items-center mt-1 ml-3 ">
                <div
                  className="flex  align-items-center justify-content-center bg-orange-100 border-round"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                >
                  <i className="pi pi-inbox text-orange-500 text-xl"></i>
                </div>
                <span className="ml-1">
                  {' '}
                  <Skeleton width="4rem" className="mb-2"></Skeleton>
                </span>
              </div>

              <div className="flex align-items-center mt-1 ml-3">
                <div
                  className="flex align-items-center justify-content-center bg-cyan-100 border-round"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                >
                  <i className="pi pi-comment text-cyan-500 text-xl"></i>
                </div>
                <span className="ml-1">
                  {' '}
                  <Skeleton width="4rem" className="mb-2"></Skeleton>{' '}
                </span>
              </div>

              <div className="flex align-items-center mt-1 ml-3">
                <div
                  className="flex align-items-center justify-content-center bg-purple-100 border-round"
                  style={{ width: '2.5rem', height: '2.5rem' }}
                >
                  <i className="pi pi-map-marker text-purple-500 text-xl"></i>
                </div>
                <span className="ml-1">
                  <Skeleton width="4rem" className="mb-2"></Skeleton>{' '}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-row xl:col-6 lg:col-12 sm:col-12 md:col-12">
          <div className="card mt-4 border-round-3xl col-12 sm:h-auto ">
            <div className="flex justify-content-start ">
              <div className="text-900 text-2xl text-blue-600 font-medium ">
                <Skeleton width="10rem" className="mb-2"></Skeleton>{' '}
              </div>
            </div>

            <div className="flex justify-content-start">
              <div className="text-400  text-blue-800 font-medium ">
                <Skeleton width="6rem" className="mb-2"></Skeleton>
              </div>
            </div>

            <div className="flex ">
              <Skeleton width="100px" height="100px" className="mr-2"></Skeleton>

              <div style={{ flex: '1' }}>
                <Skeleton width="95%" className="mb-1"></Skeleton>
                <Skeleton width="95%" className="mb-1"></Skeleton>
                <Skeleton width="95%" className="mb-4"></Skeleton>
                <div className="flex flex-row">
                  <Skeleton width="10%" className="mr-4"></Skeleton>
                  <Skeleton width="10%"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row xl:col-6 lg:col-12 sm:col-12 md:col-12">
          <div className="card mt-4 border-round-3xl col-12 sm:h-auto ">
            <div className="flex justify-content-start ">
              <div className="text-900 text-2xl text-blue-600 font-medium ">
                <Skeleton width="10rem" className="mb-2"></Skeleton>{' '}
              </div>
            </div>

            <div className="flex justify-content-start">
              <div className="text-400  text-blue-800 font-medium ">
                <Skeleton width="6rem" className="mb-2"></Skeleton>
              </div>
            </div>

            <div className="flex ">
              <Skeleton width="100px" height="100px" className="mr-2"></Skeleton>

              <div style={{ flex: '1' }}>
                <Skeleton width="95%" className="mb-1"></Skeleton>
                <Skeleton width="95%" className="mb-1"></Skeleton>
                <Skeleton width="95%" className="mb-4"></Skeleton>
                <div className="flex flex-row">
                  <Skeleton width="10%" className="mr-4"></Skeleton>
                  <Skeleton width="10%"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row xl:col-6 lg:col-12 sm:col-12 md:col-12">
          <div className="card mt-4 border-round-3xl col-12 sm:h-auto ">
            <div className="flex justify-content-start ">
              <div className="text-900 text-2xl text-blue-600 font-medium ">
                <Skeleton width="10rem" className="mb-2"></Skeleton>{' '}
              </div>
            </div>

            <div className="flex justify-content-start">
              <div className="text-400  text-blue-800 font-medium ">
                <Skeleton width="6rem" className="mb-2"></Skeleton>
              </div>
            </div>

            <div className="flex ">
              <Skeleton width="100px" height="100px" className="mr-2"></Skeleton>

              <div style={{ flex: '1' }}>
                <Skeleton width="95%" className="mb-1"></Skeleton>
                <Skeleton width="95%" className="mb-1"></Skeleton>
                <Skeleton width="95%" className="mb-4"></Skeleton>
                <div className="flex flex-row">
                  <Skeleton width="10%" className="mr-4"></Skeleton>
                  <Skeleton width="10%"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row xl:col-6 lg:col-12 sm:col-12 md:col-12">
          <div className="card mt-4 border-round-3xl col-12 sm:h-auto ">
            <div className="flex justify-content-start ">
              <div className="text-900 text-2xl text-blue-600 font-medium ">
                <Skeleton width="10rem" className="mb-2"></Skeleton>{' '}
              </div>
            </div>

            <div className="flex justify-content-start">
              <div className="text-400  text-blue-800 font-medium ">
                <Skeleton width="6rem" className="mb-2"></Skeleton>
              </div>
            </div>

            <div className="flex ">
              <Skeleton width="100px" height="100px" className="mr-2"></Skeleton>

              <div style={{ flex: '1' }}>
                <Skeleton width="95%" className="mb-1"></Skeleton>
                <Skeleton width="95%" className="mb-1"></Skeleton>
                <Skeleton width="95%" className="mb-4"></Skeleton>
                <div className="flex flex-row">
                  <Skeleton width="10%" className="mr-4"></Skeleton>
                  <Skeleton width="10%"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonEcositemas;
