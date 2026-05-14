import React from 'react'

const AuthImagePattern = ({ title, subtitle }) => {
    const grid = Array.from({ length: 9 })
    return (
        <div className='lg:flex hidden items-center justify-center bg-base-300 '>
            <div className="max-w-md p-12 text-center">
                <div className="grid grid-anim-container grid-cols-3 gap-3 ">
                    {
                        grid.map((_, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded-2xl bg-primary-content ${i % 2 === 0 ? 'animate-pulse hover:animate-none' : 'animate-none hover:animate-pulse'}`} >

                            </div>))

                    }

                </div>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div >
    )
}

export default AuthImagePattern
