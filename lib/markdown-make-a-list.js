'use babel';

import MarkdownMakeAListView from './markdown-make-a-list-view';
import {CompositeDisposable} from 'atom';

export default {

    markdownMakeAListView : null,
    modalPanel : null,
    subscriptions : null,

    activate(state) {
        this.markdownMakeAListView = new MarkdownMakeAListView(state.markdownMakeAListViewState);
        this.modalPanel = atom.workspace.addModalPanel({item: this.markdownMakeAListView.getElement(), visible: false});

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'markdown-make-a-list:toggle': () => this.toggle()
        }));

        this.subscriptions.add(atom.commands.add('atom-text-editor', {
            'markdown-make-a-list:insert-new-line': () => this.insertNewLine()
        }));

        this.subscriptions.add(atom.commands.add('atom-text-editor', {
            'markdown-make-a-list:insert-bullet': () => this.insertBullet()
        }));
    },

    deactivate() {
        this.modalPanel.destroy();
        this.subscriptions.dispose();
        this.markdownMakeAListView.destroy();
    },

    serialize() {
        return {markdownMakeAListViewState: this.markdownMakeAListView.serialize()};
    },

    toggle() {
        console.log('MarkdownMakeAList was toggled!');
        return (this.modalPanel.isVisible()
            ? this.modalPanel.hide()
            : this.modalPanel.show());
    },

    insertNewLine() {
        editor = atom.workspace.getActivePaneItem();
        editor.insertText("foobar");
    },

    insertBullet() {
        editor = atom.workspace.getActivePaneItem();
        // Go to beginning of line and insert a *
    }

};
