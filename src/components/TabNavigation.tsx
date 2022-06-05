import {Tab, Tabs, TabsProps} from '@mui/material';

interface Props {
    tabsProps?: TabsProps;
    tabs?: string[];
    currentTab: any;
    onChange: (newValue: any) => void;
}

export default function TabNavigation(props: Props) {
    return (
        <>
            <Tabs
                {...props.tabsProps}
                value={props.currentTab}
                onChange={(event, newValue) => props.onChange(newValue)}
            >
                {
                    props.tabs?.map((tab, index) => (
                        <Tab
                            key={tab + index}
                            label={tab}
                        />
                    ))
                }
            </Tabs>
        </>
    );
}
