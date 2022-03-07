import React, { useState, JSXElementConstructor, useCallback } from 'react';
import { Tree, NodeModel } from '@minoru/react-dnd-treeview';

export interface TreeItemProps {
    node: NodeModel<DataProps>;
    depth: number;
    isOpen: boolean;
    onToggle: (id: NodeModel['id']) => void;
    onUpdate: (childList: NodeModel<DataProps>[]) => void;
}

export interface TreeViewProps {
    /** Prop comment */
    treeData: NodeModel<DataProps>[];
    CustomNode: JSXElementConstructor<TreeItemProps>;
}

export interface DataProps {
    type: string;
    lazy: boolean;
    expanded: boolean;
    folder: boolean;
    prefix: string;
    iconclass: string;
    galleryID: number;
    galleryFolderID: number;
    assetID: number;
    folderID: number;
}

export const TreeView = ({ treeData, CustomNode }: TreeViewProps) => {
    const [list, setList] = useState<NodeModel<DataProps>[]>(treeData);
    const handleDrop = (newTree: NodeModel<DataProps>[]) => setList(newTree);
    const handleUpdateList = useCallback((item: NodeModel<DataProps>[]) => {
        const newList = [...list, ...item];
        setList(newList);
    }, [list]);

    return (
        <Tree
            tree={list}
            classes={{
                root: 'pl-0 ml-0 !border-l-0',
                container: 'border-l pl-2 ml-3 border-l-gray-300',
                listItem: 'flex text-sm font-medium rounded-md flex-col',
                dropTarget: 'classes-dropTarget',
                draggingSource: 'classes-draggingSource',
                placeholder: 'classes-placeholder'
            }}
            rootId={0}
            onDrop={handleDrop}
            render={(node: NodeModel<DataProps>, { depth, isOpen, onToggle }) => {
                return (
                    <CustomNode
                        node={node}
                        depth={depth}
                        isOpen={isOpen}
                        onToggle={onToggle}
                        onUpdate={handleUpdateList}
                    />
                );
            }}
        />
    );
};
