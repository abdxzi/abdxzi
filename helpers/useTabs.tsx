import { FC, ReactNode, useRef, useState } from 'react';

interface ITabTriggerList {
    className?: string
    children?: ReactNode
}

interface ITabTrigger {
    className?: string
    children?: ReactNode
    value: string
}

interface ITabContentList {
    className?: string
    children?: ReactNode
}

interface ITabContent {
    className?: string
    children?: ReactNode
    value: string
}


function useTabs(defaultTab: string) {

    const [tab, setTab] = useState(defaultTab);

    const TabContentList: FC<ITabContentList> = ({ children, className }) => {
        return (
            <div className={className}>
                {children}
            </div>
        )
    }

    const TabTriggerList: FC<ITabTriggerList> = ({ children, className }) => {
        return (
            <div className={className}>
                {children}
            </div>
        )
    }

    const TabTrigger: FC<ITabTrigger> = ({ children, className, value }) => {

        const handleTrigger = () => {
            setTab(value)
        }

        return (
            <div className={`cursor-pointer ${className}`} onClick={handleTrigger}>
                {children}
            </div>
        )
    }

    const TabContent: FC<ITabContent> = ({ children, className, value }) => {

        return (
            <div className={`${tab != value && 'hidden'} ${className}`}>
                {children}
            </div>
        )
    }

    return {
        TabTriggerList,
        TabContentList,
        TabTrigger,
        TabContent
    }
}

export default useTabs;


// "use client";

// import useTabs from "@/hooks/useTabs"
// export default function Page() {
//   const { TabContent, TabTrigger, TabContentList, TabTriggerList } = useTabs("one");
//   return (
//     <>
//       <TabTriggerList className='flex gap-[10px]'>
//         <TabTrigger value='one'>One</TabTrigger>
//         <TabTrigger value='two'>two</TabTrigger>
//         <TabTrigger value='three'>Three</TabTrigger>
//       </TabTriggerList>

//       <TabContentList>
//         <TabContent value='one'>Content 1</TabContent>
//         <TabContent value='two'>Content 2</TabContent>
//         <TabContent value='three'>Content 3</TabContent>
//       </TabContentList>
//     </>
//   )
// }